const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const output = path.resolve('build', 'alloy-preview');
const { chromium } = require(process.env.ALLOY_PLAYWRIGHT);
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const mime = {'.js':'text/javascript','.html':'text/html','.json':'application/json',
  '.css':'text/css','.wav':'audio/wav','.wasm':'application/wasm','.png':'image/png'};

async function point(page, target) {
  return page.evaluate((target) => {
    const game = window.gameTest;
    const cc = window.gameCC;
    const node = typeof target === 'number' ? game.cells[target].plate.node : game[target].plate.node;
    const world = node.worldPosition;
    const viewport = cc.view.getViewportRect();
    const canvas = document.querySelector('canvas');
    const rect = canvas.getBoundingClientRect();
    return {
      x: rect.left + (world.x * cc.view.getScaleX() + viewport.x) * rect.width / canvas.width,
      y: rect.bottom - (world.y * cc.view.getScaleY() + viewport.y) * rect.height / canvas.height,
    };
  }, target);
}

async function state(page) {
  return page.evaluate(() => {
    const { state, audio, audioUnlocked, muted, portrait, musicClip, generateClip, mergeClip, orderClip } = window.gameTest;
    return {
      board: state.board, energy: state.energy, orders: state.orderCount, tutorial: state.tutorial,
      portrait, playing: audio.playing, audioUnlocked, muted, playback: window.audioTest,
      clips: [musicClip?.name, generateClip?.name, mergeClip?.name, orderClip?.name], events: window.sdkTest,
    };
  });
}

async function open(browser, url, options) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && !/favicon|ERR_FILE_NOT_FOUND/.test(message.text())) {
      errors.push(message.text());
    }
  });
  await page.goto(url, {waitUntil:'load'});
  await page.waitForFunction(() => window.System && document.querySelector('canvas'));
  await page.evaluate(async () => { window.gameCC = await window.System.import('cc'); });
  await page.waitForFunction(() => window.gameCC.director.getScene()?.getChildByName('Canvas')?.getComponent('AlloyGame')?.cells?.length === 25, {timeout:20000});
  await page.evaluate(() => {
    const game = window.gameCC.director.getScene().getChildByName('Canvas').getComponent('AlloyGame');
    window.gameTest = game;
    window.audioTest = [];
    window.sdkTest = [];
    game.sdkAdapter = { trackEvent(event) { window.sdkTest.push(event.type); } };
    const play = game.audio.play.bind(game.audio);
    game.audio.play = () => { window.audioTest.push('music'); play(); };
    const effect = game.audio.playOneShot.bind(game.audio);
    game.audio.playOneShot = (clip, volume) => { window.audioTest.push(clip.name); effect(clip, volume); };
  });
  return { context, page, errors };
}

async function mouseClick(page, target) {
  const p = await point(page, target);
  assert.ok(p.x > 0 && p.y > 0, JSON.stringify(p));
  await page.mouse.click(p.x, p.y);
}

async function mouseDrag(page, from, to) {
  const start = await point(page, from);
  const end = await point(page, to);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(end.x, end.y, {steps:7});
  await page.mouse.up();
}

async function touchDrag(client, page, from, to) {
  const start = await point(page, from);
  const end = await point(page, to);
  await client.send('Input.dispatchTouchEvent', {type:'touchStart',touchPoints:[start]});
  for (let step = 1; step <= 8; step++) {
    const p = { x:start.x+(end.x-start.x)*step/8, y:start.y+(end.y-start.y)*step/8 };
    await client.send('Input.dispatchTouchEvent', {type:'touchMove',touchPoints:[p]});
  }
  await client.send('Input.dispatchTouchEvent', {type:'touchEnd',touchPoints:[]});
}

async function touchTap(page, target) {
  const p = await point(page, target);
  await page.touchscreen.tap(p.x, p.y);
}

(async () => {
  const server = http.createServer(async (req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const full = path.resolve(output, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!full.startsWith(output + path.sep)) { res.writeHead(403).end(); return; }
    try {
      res.writeHead(200, {'content-type':mime[path.extname(full)] ?? 'application/octet-stream'});
      res.end(await fs.readFile(full));
    } catch {
      res.end();
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = 'http://127.0.0.1:' + server.address().port;
  let browser;
  try {
    browser = await chromium.launch({executablePath:edge,headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    const { context, page, errors } = await open(browser, url, {viewport:{width:1280,height:720}});
    let snapshot = await state(page);
    console.log('Desktop initial canvas', await page.locator('canvas').boundingBox(), 'generator', await point(page,'generateControl'));
    assert.equal(snapshot.portrait, false);
    assert.deepEqual(snapshot.clips, ['WorkshopLoop','Harvest','Combine','Dispatch']);
    assert.equal(snapshot.tutorial, 'generate');
    assert.equal(snapshot.audioUnlocked, false);
    assert.equal(snapshot.playing, false);
    await page.screenshot({path:'temp/alloy-desktop.png'});
    await mouseClick(page, 'deliverControl');
    snapshot = await state(page);
    assert.equal(snapshot.orders, 0);
    assert.equal(snapshot.audioUnlocked, false);
    assert.deepEqual(snapshot.playback, []);
    const energyBefore = snapshot.energy;
    await mouseClick(page, 'generateControl');
    snapshot = await state(page);
    assert.equal(snapshot.tutorial, 'merge');
    assert.equal(snapshot.energy, energyBefore - 1);
    assert.equal(snapshot.board[0].tier, 1);
    assert.equal(snapshot.audioUnlocked, true);
    assert.deepEqual(snapshot.playback, ['music','Harvest']);
    await page.waitForFunction(() => window.gameTest.audio.playing);

    await mouseDrag(page, 0, 1);
    snapshot = await state(page);
    assert.equal(snapshot.board[0], null);
    assert.equal(snapshot.board[1].tier, 1);
    await mouseDrag(page, 1, 11);
    snapshot = await state(page);
    assert.equal(snapshot.board[1], null);
    assert.equal(snapshot.board[11].tier, 2);
    assert.equal(snapshot.tutorial, 'deliver');
    assert.equal(snapshot.playback.at(-1), 'Combine');
    await mouseClick(page, 'deliverControl');
    snapshot = await state(page);
    assert.equal(snapshot.tutorial, 'complete');
    assert.equal(snapshot.orders, 1);
    assert.equal(snapshot.board[11], null);
    assert.equal(snapshot.playback.at(-1), 'Dispatch');
    assert.deepEqual(snapshot.events, ['item_generated','item_merged','order_delivered','tutorial_completed']);
    await mouseClick(page,'muteControl');
    await mouseClick(page,'generateControl');
    snapshot = await state(page);
    assert.equal(snapshot.muted,true);
    assert.equal(snapshot.playing,false);
    assert.equal(snapshot.playback.at(-1),'Dispatch');
    await mouseClick(page,0);
    await mouseClick(page,'recycleControl');
    assert.equal((await state(page)).board[0],null);
    await mouseClick(page,'muteControl');
    await page.waitForFunction(() => window.gameTest.audio.playing);
    await page.setViewportSize({width:560,height:900});
    await page.waitForFunction(() => window.gameTest.portrait === true);
    assert.equal((await state(page)).orders,1);
    assert.deepEqual(errors, []);
    await context.close();
    console.log('Desktop: tutorial, movable cells, merge, orders, SDK, recycling and audio gate verified.');

    const mobile = await open(browser, url, {viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
    const p = mobile.page;
    const client = await mobile.context.newCDPSession(p);
    console.log('Mobile initial canvas', await p.locator('canvas').boundingBox(), 'generator', await point(p,'generateControl'));
    assert.equal((await state(p)).portrait,true);
    await touchTap(p,'generateControl');
    assert.equal((await state(p)).tutorial,'merge');
    await p.screenshot({path:'temp/alloy-mobile.png'});
    await touchDrag(client,p,0,11);
    assert.equal((await state(p)).tutorial,'deliver');
    await touchTap(p,'deliverControl');
    assert.equal((await state(p)).orders,1);
    assert.deepEqual(mobile.errors,[]);
    await mobile.context.close();
    console.log('Mobile: touch drag, tutorial and orders verified.');
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });


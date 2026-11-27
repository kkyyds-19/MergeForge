import type { AlloyItem, AlloySupplyRoute } from '../AlloyCampaign';

export const BOARD_COLUMNS = 5;
export const BOARD_ROWS = 5;

export type AlloyTutorialStep = 'generate' | 'merge' | 'deliver' | 'complete';

interface AlloyEnergyComponent {
    amount: number;
    nextRecoveryAtMs: number | null;
}

interface AlloyGeneratorComponent {
    count: number;
    level: number;
    route: AlloySupplyRoute;
}

interface AlloyProgressComponent {
    deliveredTotal: number;
    chapter: number;
    deliveredInChapter: number;
    stamps: number;
}

interface AlloyTutorialComponent {
    step: AlloyTutorialStep;
}

interface AlloyEntity {
    cell?: number;
    item?: AlloyItem;
    energy?: AlloyEnergyComponent;
    generator?: AlloyGeneratorComponent;
    progress?: AlloyProgressComponent;
    tutorial?: AlloyTutorialComponent;
}

type AlloyWith<K extends keyof AlloyEntity> = AlloyEntity & Required<Pick<AlloyEntity, K>>;

export class AlloyWorld {
    private readonly cells: AlloyWith<'cell'>[] = Array.from(
        { length: BOARD_COLUMNS * BOARD_ROWS },
        (_, cell) => ({ cell }),
    );

    public readonly session: AlloyWith<'energy' | 'generator' | 'progress' | 'tutorial'> = {
        energy: { amount: 8, nextRecoveryAtMs: null },
        generator: { count: 0, level: 1, route: 'mixed' },
        progress: { deliveredTotal: 0, chapter: 1, deliveredInChapter: 0, stamps: 0 },
        tutorial: { step: 'generate' },
    };

    private readonly entities: readonly AlloyEntity[] = [...this.cells, this.session];

    // 按必需组件查找实体，棋盘实体始终按从左到右、从上到下返回。
    public with<K extends keyof AlloyEntity>(...components: K[]): AlloyWith<K>[] {
        return this.entities.filter((entity): entity is AlloyWith<K> =>
            components.every((component) => entity[component] !== undefined));
    }

    // 按固定格序投影棋盘，空格显示为空值。
    public readBoard(): readonly (AlloyItem | null)[] {
        return this.cells.map(({ item }) => item ?? null);
    }

    // 读取指定格子的道具，越界或空格返回空值。
    public itemAt(cell: number): AlloyItem | null {
        return this.cells[cell]?.item ?? null;
    }

    // 查询按棋盘格序排列的第一个空格。
    public firstEmptyCell(): number {
        return this.cells.findIndex(({ item }) => !item);
    }

    // 校验拖拽或回收目标是否为棋盘中的整数索引。
    public hasCell(cell: number): boolean {
        return Number.isInteger(cell) && cell >= 0 && cell < this.cells.length;
    }

    // 按棋盘索引添加、替换或移除格子实体上的道具组件。
    public setItem(cell: number, item: AlloyItem | null): void {
        const entity = this.cells[cell];
        if (item) {
            entity.item = item;
        } else {
            delete entity.item;
        }
    }
}

export interface TreeNodeProps {
    key: string;
    name: string;
    children?: TreeNodeProps[];
}

export interface TreeProps {
    data: TreeNodeProps[];
}
import { useState, useCallback } from 'react';
import { TreeNodeProps, TreeProps } from './TreeNode.props.ts';
import styles from './TreeNode.module.css';
import Button from '../Button/Button.tsx';

const TreeNode = ({ data }: TreeProps) => {
    const [childNodeTree, setChildNodeTree] = useState<TreeNodeProps[]>([]);
    const [childTreeForFilter, setChildTreeForFilter] = useState<TreeNodeProps[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortAsc, setSortAsc] = useState<boolean>(true);

    const checkChild = useCallback((items: TreeNodeProps[]) => {
        items.forEach(item => {
            if (item.children && item.children.length > 0) {
                setChildNodeTree(item.children);
                setChildTreeForFilter(item.children);
            }
        });
    }, []);

    const search = useCallback(() => {
        const filteredData = childTreeForFilter.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setChildNodeTree(filteredData)
    }, [searchQuery, childTreeForFilter]);

    const sortTree = useCallback(() => {
        const sortedFilteredData = [...childNodeTree].sort((a, b) =>
            sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        setChildNodeTree(sortedFilteredData);
        setSortAsc(prevSortAsc => !prevSortAsc);
    }, [childNodeTree, sortAsc]);

    const renderTreeNodes = useCallback((items: TreeNodeProps[], level: number = 0) => {
        return (
            <ul className={styles.treeNode}>
                {items.map(item => (
                    <li key={item.key} className={styles.node} style={{ marginLeft: level * 10 }}>
                        <div onClick={() => checkChild([item])}>{item.name}</div>
                        {item.children && renderTreeNodes(item.children, level + 1)}
                    </li>
                ))}
            </ul>
        );
    }, [checkChild]);

    const renderFilterNodes = useCallback(() => {
        return (
            <ul>
                {childNodeTree.map(item => <li key={item.key}>{item.name}</li>)}
            </ul>
        );
    }, [childNodeTree]);

    return (
        <div className={styles['fullTree']}>
            <div className={styles['search']}>
                <input placeholder='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Button onClick={search}>Поиск</Button>
                <Button onClick={sortTree}>Сортировка по имени</Button>
            </div>
            <div className={styles['blockTree']}>
                <div className={styles['blockTreeNode']}>
                    {renderTreeNodes(data)}
                </div>
                <ul className={styles['blockTreeNode']}>
                    {renderFilterNodes()}
                </ul>
            </div>
        </div>
    );
};

export default TreeNode;

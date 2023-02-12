/*
 * @Author: chengyuan06 chengyuan06@baidu.com
 * @Date: 2023-02-11
 * @LastEditors: chengyuan06 chengyuan06@baidu.com
 * @LastEditTime: 2023-02-12
 * @FilePath: /svelte/src/stores/groupListStores.js
 * @Description: 统一管理程序中的groupList状态
 */
import {writable} from 'svelte/store';
import {v4 as uuidV4} from 'uuid';

const groupList = [
    {
        id: uuidV4(),
        title: '工作'
    },
    {
        id: uuidV4(),
        title: '学习'
    },
    {
        id: uuidV4(),
        title: '娱乐'
    }
];

function createGroupListStore() {
    const {subscribe, set, update} = writable(groupList);

    return {
        set,
        update,
        subscribe
    };
}

const groupListStore = createGroupListStore();

export default groupListStore;

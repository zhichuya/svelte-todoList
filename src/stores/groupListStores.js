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
        id: '69d24cbe-219d-405b-9f84-a8e6b852e2b1',
        title: '工作'
    },
    {
        id: '30b867b6-bb05-40e8-8274-60aee4255e2d',
        title: '学习'
    },
    {
        id: '493c5208-8a76-46b5-ba7c-c9d179236185',
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

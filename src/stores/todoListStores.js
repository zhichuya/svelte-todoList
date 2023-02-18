/*
 * @Author: chengyuan06 chengyuan06@baidu.com
 * @Date: 2023-02-12
 * @LastEditors: chengyuan06 chengyuan06@baidu.com
 * @LastEditTime: 2023-02-18
 * @FilePath: /svelte/src/stores/todoListStores.js
 * @Description: 统一管理程序中的todoList状态
 */
import {writable} from 'svelte/store';
import {v4 as uuidV4} from 'uuid';

import {TODO_STATUS_FINISH, TODO_STATUS_PENDING} from '../constant';

const todoList = [
    {
        id: uuidV4(),
        text: '开发编辑器',
        status: TODO_STATUS_FINISH,
        groupId: '69d24cbe-219d-405b-9f84-a8e6b852e2b1'
    },
    {
        id: uuidV4(),
        text: '修改bug',
        status: TODO_STATUS_FINISH,
        groupId: '69d24cbe-219d-405b-9f84-a8e6b852e2b1'
    },
    {
        id: uuidV4(),
        text: '看书《Vue.js设计与实现》',
        status: TODO_STATUS_FINISH,
        groupId: '30b867b6-bb05-40e8-8274-60aee4255e2d'
    },
    {
        id: uuidV4(),
        text: '学习Svelte.js',
        status: TODO_STATUS_FINISH,
        groupId: '30b867b6-bb05-40e8-8274-60aee4255e2d'
    }
];

const createTodoListStore = function () {
    const {subscribe, set, update} = writable(todoList);

    const createTodo = function (text, groupId) {
        return {
            text,
            groupId,
            id: uuidV4(),
            status: TODO_STATUS_PENDING
        };
    };

    return {
        set,
        update,
        subscribe,
        createTodo
    };
};

const todoListStore = createTodoListStore();

export default todoListStore;

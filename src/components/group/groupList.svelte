<script>
    import {v4 as uuidV4} from 'uuid';
    import addIcon from '../../assets/add.svg';
    import todoIcon from '../../assets/todo.svg';
    import EditGroup from './editGroup.svelte';


    // 组件内部的状态
    let isAddGroup = false;
    let editIdx = -1;
    // 接受父组件传递的值
    export let todoList = [];
    export let groupList = [];
    export let activeGroup = 0;
    export let addGroup = function (newGroup) {};
    export let editGroup = function (oldGroup, newGroup) {};
    export let changeActiveGroup = function (activeIdx) {};

    // 点击分组 => 通知父组件更改 activeGroup
    const handleClickGroup = function (idx) {
        changeActiveGroup(idx);
    };

    // 双击分组 => 打开编辑分组
    const handleShowEditGroup = function (idx) {
        editIdx = idx;
    };

    // 编辑分组
    const handleEditGroup = function (oldGroup, newGroup) {
        editGroup(oldGroup, newGroup);
    };

    // 展示添加分组组件
    const handleShowAddGroup = async function () {
        isAddGroup = true;
    };

    // 添加分组 => 通知触发addGroup事件父组件添加一个分组
    const handleAddGroup = function (groupTitle) {
        const id = uuidV4();
        if (groupTitle) {
            addGroup({id, title: groupTitle});
        }
        isAddGroup = false;
    };

    // 获取groupId分组下的todo数量
    const getTodoCountInGroup = function (groupId) {
        let count = 0;
        todoList.forEach(todo => {
            todo.groupId === groupId && count++;
        });
        return count;
    };
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="group-container">
    <div class="group-list">
        {#each groupList as group, idx (idx)}
            {#if idx !== editIdx}
                <div
                    class={idx !== activeGroup ? 'group-item' : 'group-item  active'}
                    on:click={e => {
                        handleClickGroup(idx);
                    }}
                    on:dblclick={e => {
                        handleShowEditGroup(idx);
                    }}
                >
                    <img class="group-icon" src={todoIcon} />
                    <div class="group-title">{group.title || '默认'}</div>
                    <div class="group-todo-count">{getTodoCountInGroup(group.id)}</div>
                </div>
            {:else}
                <EditGroup
                    value={group.title}
                    isFocused={true}
                    change={newTitle => {
                        if (newTitle) {
                            const newGroup = {
                                ...group,
                                title: newTitle
                            };
                            handleEditGroup(group, newGroup);
                        }
                        editIdx = -1;
                    }}
                />
            {/if}
        {/each}
        {#if isAddGroup}
            <EditGroup value={''} isFocused={true} change={handleAddGroup} />
        {/if}
    </div>
    <!-- 点击空白处添加一个新分组 -->
    <div class="group-blank" on:dblclick={handleShowAddGroup} />
    <div class="group-operate">
        <div class="group-add" on:click={handleShowAddGroup}>
            <img class="group-icon" src={addIcon} />
            <div class="group-title">添加分组</div>
        </div>
    </div>
</div>

<style lang="less">
    .group-container {
        height: 100%;
        font-size: 14px;
        color: #73767d;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: #f3f4f6;
        .group-list {
            .group-item {
                display: flex;
                align-items: center;
                height: 38px;
                line-height: 38px;
                border-radius: 3px;
                padding-left: 10px;
                .group-icon {
                    height: 14px;
                }
                .group-todo-count {
                    margin-left: auto;
                    margin-right: 10px;
                }
                .group-title {
                    margin-left: 6px;
                }
                &.active {
                    background-color: #dfe4f1;
                }
            }
        }
        .group-blank {
            flex: 1;
        }
        .group-operate {
            padding-top: 10px;
            padding-bottom: 10px;
            border-top: 1px solid #dddddd;
            .group-add {
                display: flex;
                align-items: center;
                height: 38px;
                line-height: 38px;
                border-radius: 3px;
                padding-left: 10px;
                .group-icon {
                    height: 14px;
                }
                .group-title {
                    margin-left: 6px;
                }
                &:hover {
                    color: #7084c5;
                }
            }
        }
    }
</style>

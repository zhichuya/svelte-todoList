<script>
    import {TODO_STATUS_PENDING, TODO_STATUS_FINISH} from '../../constant/index';
    import todoListStore from '../../stores/todoListStores';
    import EditTodoList from './editTodo.svelte';
    import AddIcon from '../../assets/add.svg';

    export let todoList = [];
    export let groupList = [];
    export let activeGroup = 0;
    export let addTodo = function (todo) {};
    export let editedTodo = function (oldTodo, newTodo) {};

    // 当前点击的todoIdx
    let clickTodoId = -1;
    let editingTodoId = -1;
    let {createTodo} = todoListStore;
    let isAddingTodo = false;

    // 计算属性：计算出所属的组
    $: groupTitle = groupList[activeGroup].title;
    $: groupId = groupList[activeGroup].id;

    // 根据 todo 的状态计算 className
    const computeClassName = todo => {
        let className = '';
        if (todo.status == TODO_STATUS_PENDING) {
            className = 'todo-pending';
        } else if (todo.status == TODO_STATUS_FINISH) {
            className = 'todo-finish';
        }

        return className;
    };

    // 判断是否todo完成
    const isFinished = todo => {
        return todo.status == TODO_STATUS_FINISH;
    };

    // 点击当个 todo
    const handleClickTodo = todo => {
        clickTodoId = todo.id;
    };

    // 改变 todo的状态 => 返回改变后的 todo
    const handleChangeTodoStatus = (e, oldTodo) => {
        const target = e.target;
        const checked = target.checked;
        let status = checked ? TODO_STATUS_FINISH : TODO_STATUS_PENDING;
        let newTodo = {
            ...oldTodo,
            status
        };
        return newTodo;
    };

    // 编辑todo
    const handleEditTodo = (oldTodo, newTodo) => {
        editedTodo(oldTodo, newTodo);
        editingTodoId = -1;
    };

    // 添加一个todo
    const handleAddTodo = text => {
        if (text.trim().length) {
            const todo = createTodo(text, groupId);
            addTodo(todo);
        }
        isAddingTodo = false;
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->

<div class="todo-list-container">
    <div class="header">
        <div class="title">{groupTitle || '默认'}</div>
        <div class="operation-container">
            <img
                class="operation-add-icon"
                src={AddIcon}
                on:click={() => {
                    isAddingTodo = true;
                }}
            />
        </div>
    </div>
    <div class="todo-list">
        {#each todoList as todo, idx (todo.id)}
            {#if todo.groupId === groupId}
                <div
                    class={todo.id !== clickTodoId ? 'todo-item' : 'todo-item click-todo'}
                    on:click={() => {
                        handleClickTodo(todo);
                    }}
                    on:dblclick={() => {
                        editingTodoId = todo.id;
                    }}
                >
                    <input
                        type="checkbox"
                        checked={isFinished(todo)}
                        class="checkbox"
                        on:change={e => {
                            const newTodo = handleChangeTodoStatus(e, todo);
                            handleEditTodo(todo, newTodo);
                        }}
                    />
                    {#if editingTodoId !== todo.id}
                        <div class={'todo-text ' + computeClassName(todo)}>{todo.text}</div>
                    {:else}
                        <!-- 编辑todoId === todo.id 渲染编辑组件 -->
                        <div class={'todo-text'}>
                            <EditTodoList
                                value={todo.text}
                                isFocused={true}
                                change={text => {
                                    const newTodo = {
                                        ...todo,
                                        text
                                    };
                                    handleEditTodo(todo, newTodo);
                                }}
                            />
                        </div>
                    {/if}
                </div>
            {/if}
        {/each}
        <!-- 新增 todo -->
        {#if isAddingTodo}
            <div class={'todo-item'}>
                <input type="checkbox" checked={false} class="checkbox" />
                <div class={'todo-text'}>
                    <EditTodoList
                        value={''}
                        isFocused={true}
                        change={text => {
                            handleAddTodo(text);
                        }}
                    />
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="less">
    .todo-list-container {
        .header {
            display: flex;
            justify-content: space-between;
            .title {
                font-size: 18px;
                font-weight: 600;
            }
            .operation-container {
                .operation-add-icon {
                    width: 20px;
                }
            }
        }
        .todo-list {
            padding-top: 10px;
            .todo-item {
                height: 40px;
                display: flex;
                font-size: 14px;
                margin-top: 10px;
                border-radius: 5px;
                align-items: center;
                box-sizing: border-box;
                background-color: #fff;
                &.click-todo {
                    border: 1px solid #6f84c5;
                }
                .checkbox {
                    margin-left: 10px;
                    border: 1 solid #d9d9d9;
                }
                .todo-text {
                    flex: 1;
                    margin-left: 8px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    &.todo-pending {
                        color: #595959;
                    }
                    &.todo-finish {
                        color: #aaaaaa;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
</style>

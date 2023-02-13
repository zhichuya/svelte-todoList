<script>
    import {TODO_STATUS_PENDING, TODO_STATUS_FINISH} from '../../constant/index';
    export let todoList = [];
    export let groupList = [];
    export let activeGroup = 0;
    export let editedTodo = function (oldTodo, newTodo) {};

    const computeClassName = todo => {
        let className = '';
        if (todo.status == TODO_STATUS_PENDING) {
            className = 'todo-pending';
        } else if (todo.status == TODO_STATUS_FINISH) {
            className = 'todo-finish';
        }

        return className;
    };

    const isFinished = todo => {
        return todo.status == TODO_STATUS_FINISH;
    };

    const handleChangeTodo = (e, oldTodo) => {
        const target = e.target;
        const checked = target.checked;
        let status = checked ? TODO_STATUS_FINISH : TODO_STATUS_PENDING;
        let newTodo = {
            ...oldTodo,
            status
        };
        editedTodo(oldTodo, newTodo);
    };
</script>

<div class="todo-list-container">
    <div class="header">
        <div class="title">{groupList[activeGroup].title || '默认'}</div>
    </div>
    <div class="todo-list">
        {#each todoList as todo, idx (todo.id)}
            {#if groupList[activeGroup].id === todo.groupId}
                <div class="todo-item">
                    <input
                        type="checkbox"
                        checked={isFinished(todo)}
                        class="checkbox"
                        on:change={e => {
                            handleChangeTodo(e, todo);
                        }}
                    />
                    <div class={'todo-text ' + computeClassName(todo)}>{todo.text}</div>
                </div>
            {/if}
        {/each}
    </div>
</div>

<style lang="less">
    .todo-list-container {
        .header {
            .title {
                font-size: 18px;
                font-weight: 600;
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
                background-color: #fff;
                .checkbox {
                    margin-left: 10px;
                    border: 1 solid #d9d9d9;
                }
                .todo-text {
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

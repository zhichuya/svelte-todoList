<script>
    import Group from './components/group/groupList.svelte';
    import groupListStore from './stores/groupListStores';
    import todoListStore from './stores/todoListStores';
    import TodoList from './components/todoList/todoList.svelte';

    // groupList的store
    const {subscribe: subscribeGroupList, set: setGroupList} = groupListStore;
    const {subscribe: subscribeTodoList, set: setTodoList} = todoListStore;
    let activeGroup = 0;
    let groupList = [];
    let todoList = [];

    subscribeGroupList(value => {
        groupList = value;
    });

    subscribeTodoList(value => {
        todoList = value;
    });

    const changeActiveGroup = function (activeIdx) {
        activeGroup = activeIdx;
    };

    const addGroup = function (newGroup) {
        setGroupList([...groupList, newGroup]);
    };

    const editGroup = function (oldGroup, newGroup) {
        const newGroupList = groupList.map(item => {
            if (item.id === oldGroup.id) {
                return newGroup;
            }
            return item;
        });
        setGroupList(newGroupList);
    };

    const deleteGroup = function (group) {
        if (group.isDefault) {
            return false;
        }

        const newGroupList = groupList.filter(item => group.id !== item.id);
        setGroupList(newGroupList);
        // 删除,更新激活group
        activeGroup = 0;

        return true;
    };

    const editedTodo = function (oldTodo, newTodo) {
        const newTodoList = todoList.map(item => {
            if (item.id === oldTodo.id) {
                return newTodo;
            }
            return item;
        });
        setTodoList(newTodoList);
    };

    const addTodo = function (todo) {
        setTodoList([todo, ...todoList]);
    };

    const deleteTodo = function (todo) {
        const newTodoList = todoList.filter(item => todo.id !== item.id);
        setTodoList(newTodoList);
    };
</script>

<div
    class="app-container"
    on:contextmenu={e => {
        e.preventDefault();
    }}
>
    <div class="left-side">
        <Group {groupList} {activeGroup} {addGroup} {editGroup} {changeActiveGroup} {todoList} {deleteGroup} />
    </div>
    <div class="right-side">
        <TodoList {groupList} {todoList} {activeGroup} {editedTodo} {addTodo} {deleteTodo} />
    </div>
</div>

<style lang="less">
    .app-container {
        display: flex;
        height: 100vh;
        padding: 5px 10px;
        .left-side {
            width: 30%;
            overflow: hidden;
            border-radius: 5px;
            padding-top: 15px;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 15px;
            background-color: #f3f4f6;
        }
        .right-side {
            flex: 1;
            margin-left: 30px;
            overflow: hidden;
            border-radius: 5px;
            padding-top: 15px;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 15px;
            background-color: #f3f4f6;
        }
    }
</style>

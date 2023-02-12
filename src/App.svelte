<script>
    import Group from './components/group/groups.svelte';
    import groupListStore from './stores/groupListStores';
    import TodoList from './components/todoList/todoList.svelte';

    const {subscribe, set} = groupListStore;
    let activeGroup = 0;
    let groupList = [];

    subscribe(value => {
        groupList = value;
    });

    const changeActiveGroup = function (event) {
        const {detail} = event;
        activeGroup = detail;
    };

    const addGroup = function (event) {
        const {detail: newGroup} = event;
        set([...groupList, newGroup]);
    };

    const editGroup = function (event) {
        const {detail} = event;
        const {oldGroup, newGroup} = detail;
        const newGroupList = groupList.map(item => {
            if ((item.id === oldGroup.id)) {
                return newGroup;
            }
            return item;
        });
        set(newGroupList);
    };
</script>

<div class="app-container">
    <div class="left-side">
        <Group
            {groupList}
            {activeGroup}
            on:addGroup={addGroup}
            on:editGroup={editGroup}
            on:changeActiveGroup={changeActiveGroup}
        />
    </div>
    <div class="right-side">
        <TodoList />
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

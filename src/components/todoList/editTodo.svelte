<script>
    import {onMount} from 'svelte';
    export let value = '';
    export let isFocused = false;
    export let change = function (value) {};

    let inputElement = null;

    onMount(() => {
        isFocused && inputElement.focus();
    });

    // 回车主动触发失去焦点事件
    const handleKeyup = function (e) {
        const {key} = e;
        if (key === 'Enter') {
            inputElement.blur();
        }
    };

    // 失去焦点 => 通知触发addGroup事件父组件添加一个分组
    const handleBlue = function (e) {
        inputElement.blur();
        change(value);
        value = '';
    };
</script>

<div class="todo-edit-container">
    <input
        bind:value={value}
        bind:this={inputElement}
        on:blur={handleBlue}
        on:keyup={handleKeyup}
        class="todo-edit-input"
        placeholder="添加一个Todo"
    />
</div>

<style lang="less">
    .todo-edit-container {
        .todo-edit-input {
            width: 100%;
            border: none;
            display: flex;
            font-size: 14px;
            align-items: center;
            box-sizing: border-box;
            background-color: #fff;
            &:focus {
                border: none;
                outline: none;
            }
        }
    }
</style>

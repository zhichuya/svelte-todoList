<script>
    /**
     * 分组编辑组件
     * props isFocused 初始化时是否获取焦点 默认为false
     * props value     初始值，默认为''
     * props change    内容改变事件回调函数, 当输入框失去焦点或者按下回车时调用
     */
    import {onMount} from 'svelte';
    export let isFocused = false;
    export let value = '';
    export let change = function (value) {};

    let inputElement;

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

<div class="group-edit-container">
    <input
        class="group-input"
        type="input"
        placeholder="添加一个分组"
        bind:value
        bind:this={inputElement}
        on:keyup={handleKeyup}
        on:blur={handleBlue}
    />
</div>

<style lang="less">
    .group-edit-container {
        height: 38px;
        .group-input {
            height: 100%;
            width: 100%;
            font-size: 14px;
            padding-left: 10px;
            box-sizing: border-box;
            border: none;
            &::placeholder {
                color: #bfbfbf;
            }
        }
    }
</style>

<script>
    /**
     * 分组编辑组件
     * props isFocused 初始化时是否获取焦点 默认为false
     * props value     初始值，默认为''
     * event change    内容改变事件, 当输入框失去焦点或者按下回车时触发
    */
    import {onMount, createEventDispatcher} from "svelte"
    export let isFocused = false;
    export let value = '';

    let inputElement;
    const dispatch = createEventDispatcher();

    onMount(() => {
        isFocused && inputElement.focus();
    })

    // 回车主动触发失去焦点事件
    const handleKeyup = function (e) {
        const {key} = e;
        if (key === 'Enter') {
            inputElement.blur();
        }
    };

    // 失去焦点 => 通知触发addGroup事件父组件添加一个分组
    const handleBlue = function (e) {
        dispatch('change', value);
        inputElement.blur();
        value = '';
    };
</script>

<div class="group-edit-container">
    <input
        class="group-input"
        type="input"
        placeholder="添加一个分组"
        bind:value={value}
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

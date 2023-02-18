<script>
    // 自定义右键菜单
    import {onMount, onDestroy} from 'svelte';

    let showMenu = false;
    let menuX = 0;
    let menuY = 0;

    function handleContextMenu(e) {
        e.preventDefault();
        showMenu = true;
        menuX = e.clientX;
        menuY = e.clientY;
        return false;
    }

    function handleClickOutside(e) {
        showMenu = false;
    }

    onMount(() => {
        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('click', handleClickOutside);
    });

    onDestroy(() => {
        window.removeEventListener('contextmenu', handleContextMenu);
        window.removeEventListener('click', handleClickOutside);
    });
</script>

<svelte:body />

{#if showMenu}
    <div class="menu" style="left: {menuX}px; top: {menuY}px;">
        <slot name="menu-header" />
        <slot name="menu-list" />
        <slot name="menu-footer" />
    </div>
{/if}

<style>
    .menu {
        padding: 10px;
        z-index: 99999;
        cursor: pointer;
        position: absolute;
        background-color: white;
        box-shadow:0px 0px 10px 0px #e4e4e5;
    }
</style>

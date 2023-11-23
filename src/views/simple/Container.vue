<template>
  <div class="unit-aside">
    <div>
        容器组件收获：可以从内部通过vnode获取组件的tag方式，判断是否含有某个特定组件
        
        return this.$slots && this.$slots.default
        ? this.$slots.default.some((vnode) => {
            const tag = vnode.componentOptions && vnode.componentOptions.tag;
            return tag === "unit-header" || tag === "unit-footer";
          })
        : false;
    </div>
    <unit-container>
      <unit-header>Header</unit-header>
      <unit-main>Main</unit-main>
    </unit-container>

    <unit-container>
      <unit-header>Header</unit-header>
      <unit-main>Main</unit-main>
      <unit-footer>Footer</unit-footer>
    </unit-container>

    <unit-container>
      <unit-aside width="200px">Aside</unit-aside>
      <unit-main>Main</unit-main>
    </unit-container>

    <unit-container>
      <unit-header>Header</unit-header>
      <unit-container>
        <unit-aside width="200px">Aside</unit-aside>
        <unit-main>Main</unit-main>
      </unit-container>
    </unit-container>

    <unit-container>
      <unit-header>Header</unit-header>
      <unit-container>
        <unit-aside width="200px">Aside</unit-aside>
        <unit-container>
          <unit-main>Main</unit-main>
          <unit-footer>Footer</unit-footer>
        </unit-container>
      </unit-container>
    </unit-container>

    <unit-container>
      <unit-aside width="200px">Aside</unit-aside>
      <unit-container>
        <unit-header>Header</unit-header>
        <unit-main>Main</unit-main>
      </unit-container>
    </unit-container>

    <unit-container>
      <unit-aside width="200px">Aside</unit-aside>
      <unit-container>
        <unit-header>Header</unit-header>
        <unit-main>Main</unit-main>
        <unit-footer>Footer</unit-footer>
      </unit-container>
    </unit-container>
  </div>
</template>
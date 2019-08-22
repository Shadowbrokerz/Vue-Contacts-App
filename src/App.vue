<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
}
#app {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
}

.container {
    background: #f9f9f9;
    margin: auto;
    max-width: 1024px;
}

.row {
    align-items: center;
    display: flex;
    &.separated {
        justify-content: space-between;
    }
}
.column {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.topBar {
    background: #f7f7f7;
    border-bottom: 1px solid #eaeaea;
    padding: 30px 20px 10px;
}

hr {
    margin: 20px 0;
    border: none;
    height: 1px;
    background-color: #eaeaea;
}
</style>

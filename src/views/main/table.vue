<template>
    <div class="p-l">
        <el-tabs v-model="activeName" type="card" class="m-t-50">
            <el-tab-pane v-for="item in sections" :key="item.id" :label="item.name"></el-tab-pane>
        </el-tabs>
        <el-table :data="getItems" ref="table" @selection-change="selectionChange">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="a" label="A"></el-table-column>
            <el-table-column prop="b" label="B"></el-table-column>
            <el-table-column prop="c" label="C"></el-table-column>
            <el-table-column prop="d" label="D"></el-table-column>
            <el-table-column prop="e" label="E"></el-table-column>
            <el-table-column prop="f" label="F"></el-table-column>
            <el-table-column prop="g" label="G"></el-table-column>
            <el-table-column prop="h" label="H"></el-table-column>
            <el-table-column prop="i" label="I"></el-table-column>
            <el-table-column prop="j" label="J"></el-table-column>
        </el-table>
    </div>
</template>

<script>
const data = [];

export default {
    data() {
        return {
            activeName: '0',
            sections: []
        };
    },
    methods: {
        save() {
            console.log(1111);
        },
        selectionChange() {
            
        }
    },
    computed: {
        getItems() {
            return JSON.parse(JSON.stringify(data[this.activeName]) || []);
        }
    },
    created() {
        window.$$test = this;
        for (var i = 0; i < 100; i++) {
            this.sections.push({
                id: i + '',
                name: 'tab' + i
            });
            var items = [];
            for (var k = 0; k < 50; k++) {
                items.push({
                    a: 'A_' + i + '_' + k,
                    b: 'B_' + i + '_' + k,
                    c: 'C_' + i + '_' + k,
                    d: 'D_' + i + '_' + k,
                    e: 'E_' + i + '_' + k,
                    f: 'F_' + i + '_' + k,
                    g: 'G_' + i + '_' + k,
                    h: 'H_' + i + '_' + k,
                    i: 'I_' + i + '_' + k,
                    j: 'J_' + i + '_' + k,
                });
            }
            data.push(items);
        }
    }
};
</script>

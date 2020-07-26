<template>
    <div class="p-m">
        <h2>
            <span>Select</span>
        </h2>
        <div>下拉选择 配合el-select使用</div>
        <h3 class="p-t-xl">示例</h3>
        <el-row :gutter="24">
            <el-col :span="6">
                <el-select v-model="enableda" class="m-b-m">
                    <el-option
                        v-for="item in $select.data('enabled')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.text"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="enabledb" class="m-b-m">
                    <el-option
                        v-for="item in $select.data('enabled')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.text"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="enabledc" class="m-b-m">
                    <el-option
                        v-for="item in $select.data('enabled')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.text"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-select v-model="enabledd" class="m-b-m">
                    <el-option
                        v-for="item in $select.data('enabled', 'number')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.text"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input class="m-b-m" :value="$select.text('enabled', enableda)"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input class="m-b-m" :value="$select.text('enabled', enabledb)"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input class="m-b-m" :value="$select.text('enabled', enabledc)"></el-input>
            </el-col>
            <el-col :span="6">
                <el-input class="m-b-m" :value="$select.text('enabled', enabledd)"></el-input>
            </el-col>
        </el-row>
        <div class="app-highlight">
            <pre v-highlight>
                <code>{{code}}</code>
            </pre>
        </div>
    </div>
</template>

<script>
const data = [];

export default {
    data() {
        return {
            enableda: '',
            enabledb: '1',
            enabledc: 1,
            enabledd: 1,
            code: '<el-row :gutter="24">\n\
    <el-col :span="6">\n\
        <el-select v-model="enableda" class="m-b-m">\n\
            <el-option\n\
                v-for="item in $select.data(\'enabled\')"\n\
                :key="item.value"\n\
                :value="item.value"\n\
                :label="item.text"\n\
            ></el-option>\n\
        </el-select>\n\
    </el-col>\n\
    <el-col :span="6">\n\
        <el-select v-model="enabledb" class="m-b-m">\n\
            <el-option\n\
                v-for="item in $select.data(\'enabled\')"\n\
                :key="item.value"\n\
                :value="item.value"\n\
                :label="item.text"\n\
            ></el-option>\n\
        </el-select>\n\
    </el-col>\n\
    <el-col :span="6">\n\
        <el-select v-model="enabledc" class="m-b-m">\n\
            <el-option\n\
                v-for="item in $select.data(\'enabled\')"\n\
                :key="item.value"\n\
                :value="item.value"\n\
                :label="item.text"\n\
            ></el-option>\n\
        </el-select>\n\
    </el-col>\n\
    <el-col :span="6">\n\
        <el-select v-model="enabledd" class="m-b-m">\n\
            <el-option\n\
                v-for="item in $select.data(\'enabled\', \'number\')"\n\
                :key="item.value"\n\
                :value="item.value"\n\
                :label="item.text"\n\
            ></el-option>\n\
        </el-select>\n\
    </el-col>\n\
    <el-col :span="6">\n\
        <el-input class="m-b-m" :value="$select.text(\'enabled\', enableda)"></el-input>\n\
    </el-col>\n\
    <el-col :span="6">\n\
        <el-input class="m-b-m" :value="$select.text(\'enabled\', enabledb)"></el-input>\n\
    </el-col>\n\
    <el-col :span="6">\n\
        <el-input class="m-b-m" :value="$select.text(\'enabled\', enabledc)"></el-input>\n\
    </el-col>\n\
    <el-col :span="6">\n\
        <el-input class="m-b-m" :value="$select.text(\'enabled\', enabledd)"></el-input>\n\
    </el-col>\n\
</el-row>\n\n\
 data() {\n\
    return {\n\
        enableda: \'\',\n\
        enabledb: \'1\',\n\
        enabledc: 1,\n\
        enabledd: 1,\n\
    }\n\
};'
        };
    }
};
</script>

<template>
	<div class="app-upload" :class="{'app-upload-inline': inline}">
		<el-input :value="form[nameField]" :title="form[nameField]" readonly :disabled="disabled" v-if="!$slots.default"></el-input>
		<el-upload :class="{'app-upload-text': !inline}" ref="upload" :action="action" :accept="accept" :disabled="disabled" :file-list="fileList" :headers="headers" :onSuccess="onSuccess" :onError="onError" :before-upload="beforeUpload" :on-progress="onProgress" :show-file-list="false">
			<slot>
				<el-button type="text" size="small" class="app-upload-upload" v-show="!form[nameField]" v-t="'button.upload'"></el-button>
			</slot>
		</el-upload>
		<div class="app-upload-btns" v-if="!$slots.default" v-show="form[nameField]">
			<el-button type="text" size="small" @click.native.prevent="preview" v-show="showPreview" v-t="'button.preview'"></el-button>
			<el-button type="text" size="small" @click.native.prevent="editor" v-show="showEditor" v-t="'button.editor'"></el-button>
			<el-button type="text" size="small" @click.native.prevent="download" v-show="showDownload" v-t="'button.download'"></el-button>
			<el-button type="text" size="small" @click.native.prevent="deleted" v-show="showDelete && !disabled" v-t="'button.delete'"></el-button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import helper from '@/plugins/helper';
import request from '@/plugins/request';

export default {
	name: 'appUpload',
	computed: {
		...mapState({
			userno: state => state.app.userno,
			username: state => state.app.username
		})
	},
	props: {
		action: {
			type: String,
			default: '/oss/prm/file/uploadandadd'
		},
		inline: {
			type: Boolean,
			default: false
		},
		form: {
			type: Object
		},
		nameField: {
			type: String,
			default: 'attachname'
		},
		idField: {
			type: String,
			default: 'attachid'
		},
		sizeField: {
			type: String,
			default: 'attachsize'
		},
		suffixField: {
			type: String,
			default: 'attachsuffix'
		},
		uploaderField: {
			type: String,
			default: 'uploadername'
		},
		uploadernoField: {
			type: String,
			default: 'uploaderno'
		},
		uploadtimeField: {
			type: String,
			default: 'uploadtime'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		accept: {
			type: String
		},
		showPreview: {
			type: Boolean,
			default: true
		},
		showEditor: {
			type: Boolean,
			default: false
		},
		showDownload: {
			type: Boolean,
			default: true
		},
		showDelete: {
			type: Boolean,
			default: true
		},
		callback: {
			type: Function,
			default: function() {
				return true;
			}
		}
	},
	data() {
		var headers = {};
		headers[request.CSRF_TOKEN] = '';
		return {
			fileList: [],
			headers: headers
		};
	},
	methods: {
		setItem(uid) {
			var xhr;
			if (!request.CSRF || !uid) return false;
			xhr = this.$refs.upload.$refs['upload-inner'];
			if (!xhr || !xhr.reqs || !xhr.reqs[uid]) return false;
			xhr = xhr.reqs[uid];
			xhr = xhr.getResponseHeader('x-csrf-token');
			xhr && localStorage.setItem(request.CSRF_TOKEN, xhr);
		},
		onSuccess(res, file) {
			var me = this,
				item = {};
			this.setItem(file.uid);
			me.removeLoading();
			if (res.code !== 'success') {
				me.$message.error(res.message);
				return false;
			}
			res = res.data;
			item[me.nameField] = res.attachname;
			item[me.idField] = res.attachid;
			item[me.sizeField] = res.attachsize;
			item[me.suffixField] = res.attachsuffix;
			item[me.uploadtimeField] = res.uploadtime;
			item[me.uploaderField] = res.uploadername;
			item[me.uploadernoField] = res.uploaderno;
			if (me.callback(item) === false) {
				return false;
			}
			me.render(item);
		},
		onError(e, file) {
			this.setItem(file.uid);
			this.$message.error(this.$t('msg.fail.upload'));
			this.removeLoading();
		},
		beforeUpload(file) {
			var me = this,
				size,
				unit = 'B';
			if (request.CSRF && localStorage.getItem(request.CSRF_TOKEN)) {
				me.headers[request.CSRF_TOKEN] = localStorage.getItem(request.CSRF_TOKEN);
			}
			me.loading();
			if (me.$$text) {
				size = file.size;
				if (size > 1024) {
					size = size / 1024;
					unit = 'K';
					if (size > 1024) {
						size = size / 1024;
						unit = 'M';
						if (size > 1024) {
							size = size / 1024;
							unit = 'G';
						}
					}
				}
				size = size > 100 ? parseInt(size) : size.toFixed(2);
				me.$$text.innerHTML = size + unit;
			}
		},
		onProgress(e, file) {
			var me = this,
				percentage;
			if (typeof file === 'object') {
				percentage = Math.round(file.percentage);
				if (me.$$bar) {
					me.$$bar.style.width = percentage + '%';
				}
				if (me.$$percent) {
					me.$$percent.innerHTML = percentage + '%';
				}
			}
		},
		loading() {
			var me = this,
				load = document.createElement('div');
			me.removeLoading();
			load.className = 'app__progress';
			load.innerHTML = '<div class="app__progress-shade"></div>' +
			'<div class="app__progress-body">' +
				'<div class="app__progress-loading">' +
					'<span class="app__progress-bar"></span>' +
				'</div>' +
				'<div class="app__progress-info clearfix">' +
					'<span class="app__progress-percent"></span>' +
					'<span class="app__progress-text"></span>' +
				'</div>' +
				/* '<div>' + me.$t('common.uploading') + '</div>' + */
			'</div>';
			document.body.appendChild(load);
			me.$$bar = load.children[1].children[0].children[0];
			me.$$percent = load.children[1].children[1].children[0];
			me.$$text = load.children[1].children[1].children[1];
		},
		removeLoading() {
			var me = this,
				k = 0,
				node = document.getElementsByClassName('app__progress'),
				len = node.length;
			while (k < len) {
				node[k].remove();
				k++;
			}
			me.$$bar = null;
			me.$$percent = null;
			me.$$text = null;
		},
		render(file) {
			var me = this;
			if (!file) file = {};
			me.form[me.nameField] = file[me.nameField];
			if (Object.prototype.hasOwnProperty.call(me.form, me.idField)) {
				me.form[me.idField] = file[me.idField];
			}
			if (Object.prototype.hasOwnProperty.call(me.form, me.sizeField)) {
				me.form[me.sizeField] = file[me.sizeField];
			}
			if (Object.prototype.hasOwnProperty.call(me.form, me.suffixField)) {
				me.form[me.suffixField] = file[me.suffixField];
			}
			if (Object.prototype.hasOwnProperty.call(me.form, me.uploadtimeField)) {
				me.form[me.uploadtimeField] = file[me.uploadtimeField];
			}
			if (Object.prototype.hasOwnProperty.call(me.form, me.uploaderField)) {
				me.form[me.uploaderField] = file[me.uploaderField];
			}
			if (Object.prototype.hasOwnProperty.call(me.form, me.uploadernoField)) {
				me.form[me.uploadernoField] = file[me.uploadernoField];
			}
		},
		deleted() {
			this.render();
		},
		preview() {
			helper.preview(this.form[this.idField]);
		},
		download() {
			helper.download(this.form[this.idField]);
		},
		editor() {
			helper.editor(this.form[this.idField]);
		}
	}
};
</script>

<style lang="css" scoped>
/* 上传组件 */
.app-upload {
	position: relative;
	height: 32px;
	line-height: 32px;
}
.app-upload.app-upload-inline {
    display: inline-block;
}
.app-upload.app-upload-inline .el-upload {
    width: 100%;
}
.app-upload .app-upload-text {
	position: absolute;
	padding-left: 8PX;
	top: 0;
	width: 100%;
}
.app-upload .app-upload-text .el-upload {
    text-align: left;
}
.app-upload-upload {
	position: absolute;
	height: 32PX;
	line-height: 32PX;
	padding: 0;
	margin: 0;
	left: 8PX;
	top: 0;
}
.app-upload-btns {
	position: absolute;
	height: 28px;
	line-height: 28px;
	right: 8PX;
	top: 2px;
	background: #ffffff;
}
</style>
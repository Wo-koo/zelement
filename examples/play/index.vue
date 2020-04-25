<template>
    <div style="margin: 20px">
        <z-alert title='titleTxt'/>
        <el-alert title='element alert message' type='success'/>
    </div>
</template>

<script>
export default {
    data(){
        return{
            titleTxt:'z-element',
        }
    }
}
</script>
<template>
    <div style="margin: 20px">
        <z-alert title='ZAlertTest' description='This is an message from ZAlert'/>
        <z-alert type='success' title='ZAlertTest' description='This is an message from ZAlert'/>
        <z-alert type='error' title='ZAlertTest' description='This is an message from ZAlert'/>
        <z-alert type='warning' title='ZAlertTest' description='This is an message from ZAlert'/>
        <z-button>CommonButton</z-button>
        <button> window Button</button>
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
import Alert from "./src/Alert";

Alert.install = function(Vue){
    Vue.Component(Alert.name,Alert);
}

export default Alert;
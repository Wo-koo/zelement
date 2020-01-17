import { Alert } from "./src/Alert";

Alert.install = function(vue){
    Vue.Component(Alert.name,Alert);
}

export default Alert;
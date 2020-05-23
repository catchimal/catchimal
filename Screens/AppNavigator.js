import Login from "./Login";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import Home from "./Home";

const AppNavigator = createStackNavigator({
    Login: {
        screen: Home,
    },
    Home: {
        screen: Home
    }
}, {
    headerMode: 'none',
});

export default createAppContainer(AppNavigator);

import Login from "./Login";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "./Home";
import AnimalList from "../Components/AnimalList";

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
    },
    Home: {
        screen: Home
    },
    AnimalList: {
        screen:AnimalList
    }
}, {
    headerMode: 'none',
});

export default createAppContainer(AppNavigator);

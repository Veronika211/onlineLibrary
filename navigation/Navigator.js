import React from 'react'; 
import {Platform, Alert,Text} from 'react-native';
import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Homepage from '../screens/Homepage'
import BookList from '../screens/BookList'
import BookInfo from '../screens/BookInfo'
import ReadingList from '../screens/ReadingList'
import { Ionicons,Entypo,FontAwesome5 } from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import LogIn from '../screens/LogIn'

const defaultSet ={
        headerStyle:{
        backgroundColor: Platform.OS === 'android' ? '#70012B' : 'white',
        },
        headerTitleStyle:{
            fontFamily: 'arimo-bold'
        },
        headerBackTitleStyle:{
            fontFamily: 'arimo'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : '#70012B'
}
const Navigator = createStackNavigator({
    //Homepage,Books i Info su route names preko kojih pristupamo tim stranicama
    Homepage: Homepage,
    Books: BookList,
    Info: BookInfo
    //drugi argument nam omogucava da definisemo nacin na koji zelimo da nam header izgleda na svim ekranima
},{
    defaultNavigationOptions: defaultSet
});
const ReadingL = createStackNavigator({
    ReadingList:{
        screen: ReadingList
    },
    Info:{
        screen:BookInfo
    } 
}, {
    defaultNavigationOptions: defaultSet
})

const ScreenConfig = {
       //Root nam je zapravo ovaj gornji navigator koji kontrolise sve na klik i on je na ovaj nacin ugnjezden u footer
       Root: {
        screen: Navigator,
        navigationOptions:{
            tabBarLabel: 'Početna',
            tabBarIcon: (tabInfo) => {
                return (
                <Entypo name="home" size={24} color={tabInfo.tintColor} />
                )
            },
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily:'arimo'}}>Početna</Text> : 'Početna'
            //activeTintColor: '#BA275E'
        }
    },
    ReadingList: {
        screen: ReadingL,
        navigationOptions:{
            tabBarLabel: 'Lista čitanja',
            tabBarIcon: (tabInfo) => {
                return (
                <FontAwesome5 name="book-open" size={24} color={tabInfo.tintColor} />
                )
            },
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily:'arimo'}}>Lista čitanja</Text> : 'Lista čitanja'
        }
    }
}
const FooterNavigator = Platform.OS === 'android' ? 
    createMaterialBottomTabNavigator(
        ScreenConfig, {
            activeTintColor:'white',
            activeBackgroundColor: '#BA275E',
            shifting: false,
            barStyle:{
                backgroundColor: '#70012B'
            }
        }) : 
    createBottomTabNavigator(
    ScreenConfig,{
    tabBarOptions:{
        labelStyle:{
            fontFamily: 'arimo-bold'
        },
        activeTintColor: '#70012B'
    }
})
const LogInNavigator = createStackNavigator({
    LogIn: LogIn
})


//ovo nam sluzi za prelaz izmedju login stranice i pocetne
const SwitchNavigator = createSwitchNavigator({
    LogIn: LogInNavigator,
    Knjizara: FooterNavigator
})


//navigacija sa strane 
const MainNavigator = createDrawerNavigator({
    Homepage: SwitchNavigator,
    LogOut: {
        screen: LogIn,
        navigationOptions:{
            drawerLabel: 'Odjavi se'
        }
    }
},{
    contentOptions:{
        activeTintColor: '#70012B',
        labelStyle:{
            fontFamily: 'arimo-bold'
        }
    }
}
);
export default createAppContainer(MainNavigator);
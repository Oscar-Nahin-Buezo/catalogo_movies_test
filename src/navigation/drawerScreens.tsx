import { createDrawerNavigator } from '@react-navigation/drawer';
import { MainStack } from './mainStack';
import { UserStack } from './mainStack';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainStack} />
    </Drawer.Navigator>
  );
};
export default DrawerScreens;

import Container from "../../screenContainer"
import { drawerBodyStyles, drawerHeaderStyles } from "./styles"
import useTheme from "../../../theme"
import colors from "../../../theme/colors"
import DrawerHeader from './HeaderDrawer'
import DrawerList from "./DrawerList"
import { ScrollView } from "react-native"
import { View } from "react-native"


export default ({ scheme }: { scheme: "light" | "dark" }) => (<View style={drawerBodyStyles(scheme).divider} />)

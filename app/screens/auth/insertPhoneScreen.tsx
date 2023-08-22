import { JSX } from "react"
import { SafeAreaView, StatusBar, View } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Animated from "react-native-reanimated"
import colors from "../../theme/colors"
import Text from "../../components/Text"
import Container from "../../components/screenContainer"


function InsertPhoneVerify(): JSX.Element {



    return (
        <Container
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <View
                style={{ height: 500 }}>
                <Animated.View sharedTransitionTag="intro">
                    <FontAwesome name="send-o" color={colors.primary} size={100} />
                </Animated.View>

                

            </View>



        </Container>

    )
}


export default InsertPhoneVerify
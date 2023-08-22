
import { TouchableOpacity, GestureResponderEvent, TouchableOpacityProps } from "react-native"
import colors from "../theme/colors"


interface propsType extends TouchableOpacityProps {
    icon: React.ReactNode,
}



export default function FloatingButton(props: propsType) {


    return (

        <TouchableOpacity
            {...props}

            style={[{
                justifyContent: 'center',
                alignItems: 'center',
                position: "absolute",
                width: 60,
                height: 60,
                backgroundColor: colors.primary,
                bottom: 30,
                right: 30,
                borderRadius: 40,
            }, props.style]}>
            {props.icon}
        </TouchableOpacity>

    )
}
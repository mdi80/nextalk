import { contactType, sectionType } from "./ConatactList";



const convertDataToSection = (data: contactType[]): sectionType[] => {

    const sections: { title: string, data: contactType[] }[] = []

    data.forEach((item) => {
        const i = sections.findIndex(secItem => secItem.title === item.name[0])
        if (i === -1) {
            sections.push({ title: item.name[0], data: [item] })
        } else {
            sections[i] = {
                ...sections[i],
                data: [
                    ...sections[i].data,
                    item
                ]
            }
        }
    })


    sections.sort((a, b) => (a.title >= b.title ? 1 : -1))
    console.log(sections);

    sections.forEach(secItem => {
        secItem.data.sort((a, b) => (a.name >= b.name ? 1 : -1))
    })

    return sections
}

export { convertDataToSection }
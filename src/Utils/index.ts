// import { useCRUD } from "../hooks/useCRUD"
// import moment from "moment"



// export const handleAction = async (type: string, id: string, data?: any) => {
//     const { refetch, updateData, addData, deleteData } = useCRUD()
//     try {
//         switch (type) {
//             case "update":
//                 await updateData(id, {
//                     checked: [
//                         {
//                             date: moment().format("YYYY-MM-DD"),
//                             isChecked: !data.checked[0].isChecked,
//                         },
//                     ],
//                 })
//                 break
//             case "add":
//                 await addData({
//                     name: data,
//                     checked: [
//                         {
//                             isChecked: false,
//                         },
//                     ],
//                 })
//                 break
//             case "remove":
//                 await deleteData(id)
//                 break
//             default:
//                 alert(`please chose the right actions ... your action is: ${type}`)
//         }
//         refetch()
//     } catch (error) {
//         refetch()
//     }
// }
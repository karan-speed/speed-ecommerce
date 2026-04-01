//  <Table className={classes}>
//       <TableBody>
//         <TableRow>
//           <TableCell>
//             <Text customClass="font28 border-bottom">Details</Text>
//           </TableCell>
//         </TableRow>
//         {productAllDetailColumns[0].details.map((col) => (
//           <TableRow key={String(col.key)}>
//             <TableHead sx={{ fontWeight: 600 }}>
//               <TableCell component={"td"}>{col.label}</TableCell>
//             </TableHead>

//             <TableCell>
//               {col.render
//                 ? col.render(data)
//                 : Array.isArray(data[col.key as keyof Product])
//                   ? JSON.stringify(data[col.key as keyof Product])
//                   : (data[col.key as keyof Product] as any)}
//             </TableCell>
//           </TableRow>
//         ))}

//         <TableRow>
//           <TableCell>
//             <Text customClass="font28 border-bottom">Images</Text>
//           </TableCell>
//         </TableRow>

//         {productAllDetailColumns[0].images.map((col) => (
//           <TableRow key={String(col.key)}>
//             <TableCell>
//               {col.render
//                 ? col.render(data)
//                 : Array.isArray(data[col.key as keyof Product])
//                   ? JSON.stringify(data[col.key as keyof Product])
//                   : (data[col.key as keyof Product] as any)}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>

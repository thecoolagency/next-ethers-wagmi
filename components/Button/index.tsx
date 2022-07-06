// import Link from "next/link";
// import styles from "./button.module.scss";

// const Button = ({ linkData, labelData }: {
//   linkData: any;
//   labelData: any;
// }) => {
//   const serializer = (
//     type,
//     element,
//     content,
//     children,
//     index
//   ): React.ReactNode => {
//       return <span>{children}</span>;
//   };
  
//   const WebLink = (link, label: RichTextBlock[]) => {
//     return (
//       <a
//         href={link?.url}
//         title={label[0].text}
//         target={link?.target}
//         rel="noopener noreferrer"
//         className={styles.button}
//       >
//         <RichText render={labelData} htmlSerializer={serializer} />
//       </a>
//     );
//   };

//   const PageLink = (link, label) => {
//     // replace all occurences from uid _ to / to suuport nested paths
//     return (
//       <Link href={`/${link?._meta?.uid?.replace(new RegExp("_", "g"), "/")}`}>
//         <a className={styles.button}>
//              <RichText render={labelData} htmlSerializer={ serializer }/>
//            </a>
//       </Link>
//     );
//   };

//   const ButtonByType = ({ link, label }) => {
//     if (link?._linkType === "Link.web") {
//       return WebLink(link, label);
//     } else if (link?._linkType === "Link.document") {
//       return PageLink(link, label);
//     } else {
//       return null;
//     }
//   };

//   return <ButtonByType link={linkData} label={labelData} />;
// };

// export default Button;

import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css'

// SSGは静的なページ、SSRは動的なページに向いているっぽい
// SSG = getStaticProps(+getStaticPaths)
// SSR = getServerSideProps  を使えばよいっぽい


// // SSGの場合:手順は二つ
// // 1、getStaticPropsでpropsにfetchで取り出したデータを送る
// export const getStaticProps = async ({params}:any) => { // paramsには自動的にURLパラメータの値が入るっぽい
//     const req = await fetch(`http://localhost:3000/${params.id}.json`)
//     const data = await req.json();
    
//     return {
//         // コンポーネントにpropsの形で渡される。
//         props: {
//             product: data,
//         }, 
//       }
// }
// type product = {
//     id: string,
//     name: string,
//     image: string,
// }
// // 2、ダイナミックルーティングを実装するためにgetStaticPathsを使ってパスを取得する
// //「ダイナミックルーティングを実装する」というのは、「複数のURLに対応したページファイルを作る」ということと同じ意味です。
// // 例えば home/products/[id] ←これ
// // getStaticPathsを使って[id]に入る値を定義する必要がある。
// export const getStaticPaths = async () => {
//     const req = await fetch(`http://localhost:3000/products.json`)
//     const data = await req.json();
//     // map関数で["smartPhone", "pc", "headPhone"]を取り出す
//     const paths = data.map(( product: string )=> {
//         return {
//             params: {
//                 id: product,
//             }, 
//           }
//     })
    
//     return {
//         paths,
//         fallback: false, // pathsに設定されていないURLはすべて404になる
//     }
// }

// SSRの場合(ユーザーがrequestしたときにレンダリングするらしい)
export const getServerSideProps = async ({params}:any) => { // paramsには自動的にURLパラメータの値が入るっぽい
    const req = await fetch(`http://localhost:3000/${params.id}.json`)
    const data = await req.json();
    
    return {
        // コンポーネントにpropsの形で渡される。
        props: {
            product: data,
        }, 
      }
}




type Props = {
    product: {
        id: string,
        name: string,
        image: string,
    }
}
const Product: NextPage<Props> = (props: Props) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>{id}のページです</h1>
                <img src={props.product.image} width="100" height="100" />
                <p>{props.product.name}</p>
                <br />
                <Link href="/">戻る</Link>
            </main>
        </div>
    );
}

export default Product;
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import MainNav from '@/components/MainNav'
import ArtworkCard from '@/components/ArtworkCard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <ArtworkCard objectID={45734} />
    </>
  )
}

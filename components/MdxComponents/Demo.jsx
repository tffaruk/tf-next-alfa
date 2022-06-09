import Link from "next/link"

const Demo = ({ href, rel }) => {
  return (
    <Link href={href} passHref>
    <a target="_blank" rel={`noopener noreferrer ${rel?(rel==="follow"?"":rel):"nofollow"}`} className={`btn mb-4  btn-outline-primary`}>
      Demo
    </a>
    </Link>
  )
}

export default Demo

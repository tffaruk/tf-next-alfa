import Link from "next/link"

const Download = ({ href, rel }) => {
  return (
    <Link href={href} passHref>
    <a target="_blank" rel={`noopener noreferrer ${rel?(rel==="follow"?"":rel):"nofollow"}`} className={`btn mb-4 me-4  btn-primary`}>
      Download
    </a>
    </Link>
  )
}

export default Download

import Link from "next/link"

const A = ({ href, rel, children }) => {
  return (
    <Link href={href} passHref>
    <a target="_blank" rel={`noopener noreferrer ${href.match(/^http/)?(rel?(rel==="follow"?"":rel):"nofollow"):rel?(rel==="nofollow"?"nofollow":""):""}`}>
      {children}
    </a>
    </Link>
  )
}

export default A

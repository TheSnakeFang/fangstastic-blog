const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), '../../content/blog')

console.log(`Scanning directory: ${postsDirectory}`)

fs.readdirSync(postsDirectory, { withFileTypes: true }).forEach(dirent => {
  if (dirent.isDirectory()) {
    const postDir = path.join(postsDirectory, dirent.name)
    const indexPath = path.join(postDir, 'index.md')
    
    if (fs.existsSync(indexPath)) {
      console.log(`Processing file: ${indexPath}`)
      
      const fileContents = fs.readFileSync(indexPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Check if the directory name matches the lowercase version
      if (dirent.name !== dirent.name.toLowerCase()) {
        const newDirName = dirent.name.toLowerCase()
        const newDirPath = path.join(postsDirectory, newDirName)
        
        // Rename the directory
        fs.renameSync(postDir, newDirPath)
        console.log(`Renamed directory from ${dirent.name} to ${newDirName}`)
        
        // Update the slug in the frontmatter if it exists
        if (data.slug) {
          data.slug = data.slug.toLowerCase()
          const updatedFileContents = matter.stringify(content, data)
          fs.writeFileSync(path.join(newDirPath, 'index.md'), updatedFileContents)
          console.log(`Updated slug in frontmatter for ${newDirName}`)
        }
      } else {
        console.log(`No changes needed for ${dirent.name}`)
      }
    } else {
      console.log(`No index.md found in ${dirent.name}`)
    }
  }
})

console.log('Script completed')
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  return blogs.reduce((likeCount, blog) => (
    likeCount + Number(blog.likes)
  ), 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined;

  let favorite = blogs[0]

  blogs.forEach((blog) => {
    if (Number(blog.likes) > Number(favorite.likes)) favorite = blog;
  });

  return favorite;
}

const getAuthorsAndBlogs = (blogs) => {
  const authorsAndBlogs = {}

  blogs.forEach((blog) => {
    const author = blog.author;

    if (Object.keys(authorsAndBlogs).includes(author)) {
      authorsAndBlogs[author] = authorsAndBlogs[author].concat(blog);
    } else {
      authorsAndBlogs[author] = [blog];
    }
  });

  return authorsAndBlogs;
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined;
  
  const authorsAndBlogs = getAuthorsAndBlogs(blogs);
  const authors = Object.keys(authorsAndBlogs);
  
  const authorsAndBlogCounts = authors.map(author => {
    return { author, blogs: authorsAndBlogs[author].length }
  });

  let authorWithMostBlogs = authorsAndBlogCounts[0].author;
  let mostBlogs = authorsAndBlogCounts[0].blogs;

  authorsAndBlogCounts.forEach(({ author, blogs }) => {
    if (blogs > mostBlogs) {
      authorWithMostBlogs = author;
      mostBlogs = blogs;
    }
  });

  return { 
    author: authorWithMostBlogs,
    blogs: mostBlogs,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined;

  const authorsAndBlogs = getAuthorsAndBlogs(blogs);
  const authors = Object.keys(authorsAndBlogs);

  const authorsAndLikeCounts = authors.map(author => {
    const authorAndLikeCount = {};
    const likeCount = blogs
      .filter(blog => blog.author === author)
      .reduce((likeCount, blog) => likeCount + blog.likes, 0);

    return { author, likes: likeCount }
  });

  let authorWithMostLikes = authorsAndLikeCounts[0].author;
  let mostLikes = authorsAndLikeCounts[0].likes;

  authorsAndLikeCounts.forEach(({ author, likes}) => {
    if (likes > mostLikes) {
      authorWithMostLikes = author;
      mostLikes = likes;
    }
  });

  return {
    author: authorWithMostLikes,
    likes: mostLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
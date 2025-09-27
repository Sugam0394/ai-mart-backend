 # AI-Mart v1

AI-Mart is a full-stack project (currently backend v1) that allows users and admins to manage AI tools, post reviews, and fetch tools with advanced filters. It is built using Node.js, Express, MongoDB, and JWT authentication.

---

## Features

### Authentication
- **User Registration & Login**
- **Admin Registration & Login**
- JWT-based protected routes for secure access

### Tools Management
- CRUD operations for AI tools:
  - **Create Tool** (Admin)
  - **Read Tool** (Admin/User)
  - **Update Tool** (Admin)
  - **Delete Tool** (Admin)
 

### Reviews
- Users can create reviews for tools.
- Admin can fetch all reviews for moderation.
- Automatic update of **average rating** and **number of reviews** on each tool.
- Protected routes for review management.

---

## Models

### User Model
- Fields: `name`, `email`, `password`, `role` (`user` or `admin`)
- Password hashing
- JWT generation for authentication

### Admin Model
- Same as User model but role is `admin`

### Tool Model
- Fields: `title`, `description`, `category`, `createdBy`, `averageRating`, `numberOfReviews`, `price`, `link`, `tags`
- Relational reference to `User` who created the tool

### Review Model
- Fields:
  - `user` → ObjectId of the User
  - `tool` → ObjectId of the Tool being reviewed
  - `rating` → Number
  - `comment` → String
- **Functionality**:
  - Each user can post one review per tool.
  - After creation/deletion, the tool’s **averageRating** and **numberOfReviews** are automatically updated.
  - Admin can fetch all reviews of a tool.
- **Sample Code**:

```javascript
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tool: { type: mongoose.Schema.Types.ObjectId, ref: "Tool", required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
}, { timestamps: true });

// Update tool rating after review is created/deleted
reviewSchema.statics.updateToolRating = async function(toolId) {
    const reviews = await this.find({ tool: toolId });
    const avgRating = reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length || 0;
    await Tool.findByIdAndUpdate(toolId, {
        averageRating: avgRating,
        numberOfReviews: reviews.length,
    });
};

 



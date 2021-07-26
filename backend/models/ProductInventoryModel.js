import mongoose from 'mongoose';

const NoteSchema = mongoose.Schema(
   {
      note: {
         type: String,
         required: true
      }
   },
   {
      timestamps: true,
   }
)
const ItemSchema = mongoose.Schema (
   {
      material: {
         type: String,
         required: true
      },
      
      color: {
         type: String,
         required: true
      },
      qty: {
         type: Number,
         required: true
      },
      threshold: {
         type: Number,
         required: false
      },
      notes: [
         NoteSchema
      ]
   },
   {timestamps: true}
)
const ProductSchema = mongoose.Schema (
   {
      title: {
         type: String,
         required: true
      },
      description: {
         type: String,
         required: false
      },
      items: [
         ItemSchema
      ],
      notes: [
         NoteSchema
      ]
   },
   {timestamps: true}
)
const ProductInventorySchema = mongoose.Schema(
  {
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    notes: [
        NoteSchema
      ],
    products: [
       ProductSchema
    ],
    
  },
  
  {
    timestamps: true,
  }
);





const ProductInventory = mongoose.model('ProductInventory', ProductInventorySchema);

export default ProductInventory;

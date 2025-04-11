import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ItemsActivityDocument = ItemsActivity & Document;

@Schema({ 
  timestamps: true,
  collection: 'itemsactivities' // Explicit collection name
})
export class ItemsActivity {
  @Prop({ 
    type: Types.ObjectId, 
    ref: 'Item', // Simple reference instead of refPath
    required: true 
  })
  itemId: Types.ObjectId;

  // @Prop({ 
  //   type: Types.ObjectId,
  //   ref: 'User',
  //   required: true // Add this field to match your queries
  // })
  // userId: Types.ObjectId;

  @Prop({ 
    required: true, 
    enum: ['crops', 'livestock', 'tools', 'supplies'],
    index: true // Add index for better performance
  })
  category: string;

  @Prop({ 
    required: true, 
    enum: ['issue', 'sell', 'stockup'] 
  })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;


  @Prop()
  price?: number;

  @Prop({ required: true })
  recipient: string;

  // @Prop()
  // description: string;

  @Prop({ default: false })
  returned: boolean;

  @Prop({ 
    type: String, 
    required: true 
  })
  editedBy: string;

  @Prop({ 
    type: Date, 
    default: Date.now,
    index: true 
  })
  date: Date;

  @Prop({ default: 'pcs' }) // Default to 'pcs' (pieces)
  unit: string;
}

export const ItemsActivitySchema = SchemaFactory.createForClass(ItemsActivity); 
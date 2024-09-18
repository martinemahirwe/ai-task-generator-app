
import { type NextRequest, NextResponse } from 'next/server';
import { QuestionSchema } from '~/utils/validation/schema.validation';
import { createPathTask } from '~/app/actions/actions';

export const maxDuration = 30;
export async function POST(req: NextRequest) {
  try {
    const  {topic,selectedType,label} = await req.json() as {topic: string, selectedType:string[],label:string};
    
    const task = await createPathTask(topic,selectedType,label);
    
    return NextResponse.json(
      { message: 'Here is the response from AI', data: task},
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Failed to query AI', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

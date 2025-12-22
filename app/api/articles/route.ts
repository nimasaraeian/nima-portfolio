import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'app', 'data', 'articles.json');

export async function GET() {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const articles = JSON.parse(fileData);
    return NextResponse.json(articles, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read articles' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newArticle = {
      ...body,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const fileData = fs.readFileSync(filePath, 'utf-8');
    const articles = JSON.parse(fileData);
    articles.push(newArticle);

    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
    
    return NextResponse.json(
      { message: 'Article saved successfully', article: newArticle },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save article' },
      { status: 500 }
    );
  }
}


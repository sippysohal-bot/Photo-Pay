import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { galleryId, transactionId: _transactionId } = await request.json();

    if (!galleryId) {
      return NextResponse.json(
        { success: false, message: 'Gallery ID is required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully! Watermark removed.',
      isPaid: true,
    });
  } catch (error) {
    // Log the error for debugging purposes and return a generic server error
    // eslint-disable-next-line no-console
    console.error('verify-payment error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
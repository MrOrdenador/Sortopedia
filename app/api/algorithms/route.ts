import { connectDB } from "@/lib/mongoose";
import Algorithm from "@/models/Algorithm";

function validateApiKey(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  return apiKey === process.env.API_KEY;
}

export async function GET() {
  await connectDB();
  const algorithms = await Algorithm.find();
  return Response.json(algorithms);
}

export async function POST(request: Request) {
  try {
    if (!validateApiKey(request)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    body.info.tier = body.info.tier.toUpperCase();

    const algorithm = await Algorithm.create(body);
    return Response.json(algorithm, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return Response.json(
      { error: "Failed to create algorithm" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!validateApiKey(request)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { _id } = await request.json();

    if (!_id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const algorithm = await Algorithm.findByIdAndDelete(_id);

    if (!algorithm) {
      return Response.json({ error: "Algorithm not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Algorithm deleted successfully", algorithm },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE error:", err);
    return Response.json(
      { error: "Failed to delete algorithm" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!validateApiKey(request)) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    body.info.tier = body.info.tier.toUpperCase();

    const algorithm = await Algorithm.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!algorithm) {
      return Response.json({ error: "Algorithm not found" }, { status: 404 });
    }

    return Response.json(algorithm, { status: 200 });
  } catch (err) {
    console.error("PATCH error:", err);
    return Response.json(
      { error: "Failed to update algorithm" },
      { status: 500 }
    );
  }
}

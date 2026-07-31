import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Logger } from '@/lib/reliability/logger';

const prisma = new PrismaClient();

/**
 * Health Check API (Liveness & Readiness)
 * Usado por ferramentas como UptimeRobot e orquestradores (Kubernetes/Vercel)
 */
export async function GET() {
  const startTime = Date.now();
  let dbStatus = 'healthy';
  let dbLatency = 0;

  try {
    // Tenta executar uma query levíssima para testar o banco (Readiness)
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatency = Date.now() - dbStart;
  } catch (error) {
    dbStatus = 'unhealthy';
    Logger.error({ message: 'HealthCheck: Banco de dados inacessível' }, error as Error);
    
    return NextResponse.json(
      { status: 'error', message: 'Database connection failed' },
      { status: 503 } // 503 Service Unavailable (dispara alertas externos)
    );
  }

  const totalLatency = Date.now() - startTime;

  Logger.info({
    message: 'HealthCheck ping',
    context: { dbLatency, totalLatency }
  });

  return NextResponse.json(
    {
      status: 'ok',
      version: '1.0.0', // Aqui poderia ler do package.json
      environment: process.env.NODE_ENV,
      services: {
        database: {
          status: dbStatus,
          latencyMs: dbLatency,
        },
      },
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

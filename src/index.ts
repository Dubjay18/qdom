/**
 * This file creates a server using the http module and sets up a socket.io server to handle real-time communication between clients.
 * @packageDocumentation
 */

import http from "http";
import { PORT } from "./config/constants";
import { app } from "./app";
import { secureServerListen } from "./config/server";

/**
 * The http server instance.
 */
const server: http.Server = http.createServer(app);

/**
 * Starts the secure server listening on the specified port.
 */
secureServerListen(PORT, server);

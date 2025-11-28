# @axi-engine/events

This package provides a simple wrapper around eventemitter3 
to serve as the core event system for the Axi Engine ecosystem.


The primary purpose is to create a stable abstraction layer. 
This allows other engine components to depend on a consistent API while leaving room 
for future customization or replacement of the underlying event emitter implementation without breaking changes.

